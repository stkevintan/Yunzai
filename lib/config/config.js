import YAML from "yaml"
import fs from "node:fs"
import chokidar from "chokidar"

/** 配置文件 */
class Cfg {
  constructor() {
    this.config = {}
    /** 监听文件 */
    this.watcher = { config: {}, defSet: {} }
    this.initCfg()
    return new Proxy(this, {
      get: (target, prop) => target[prop] ?? target.getAllCfg(String(prop)),
    })
  }

  /** 初始化配置 */
  initCfg() {
    let path = "config/config/"
    let pathDef = "config/default_config/"
    const files = fs.readdirSync(pathDef).filter(file => file.endsWith(".yaml"))
    for (const file of files)
      if (!fs.existsSync(`${path}${file}`))
        fs.copyFileSync(`${pathDef}${file}`, `${path}${file}`)
    for (const i of ["data", "temp"])
      if (!fs.existsSync(i))
        fs.mkdirSync(i)
  }

  /** 主人账号 */
  get masterQQ() {
    let masterQQ = this.getAllCfg("other").masterQQ || []

    if (!Array.isArray(masterQQ))
      masterQQ = [masterQQ]

    const masters = []
    for (const i of masterQQ)
      masters.push(Number(i) || i)
    return masters
  }

  /** Bot账号:[主人帐号] */
  get master() {
    let master = this.getAllCfg("other").master || []

    if (!Array.isArray(master))
      master = [master]

    const masters = {}
    for (let i of master) {
      i = i.split(":")
      const bot_id = i.shift()
      const user_id = i.join(":")
      if (Array.isArray(masters[bot_id]))
        masters[bot_id].push(user_id)
      else
        masters[bot_id] = [user_id]
    }
    return masters
  }

  /** 机器人账号 */
  get uin() {
    return Object.keys(this.master)
  }
  get qq() {
    return this.uin
  }

  /** package.json */
  get package() {
    if (this._package) return this._package

    this._package = JSON.parse(fs.readFileSync("package.json", "utf8"))
    return this._package
  }

  /** 群配置 */
  getGroup(bot_id = "", group_id = "") {
    const config = this.getAllCfg("group")
    return {
      ...config.default,
      ...config[`${bot_id}:default`],
      ...config[group_id],
      ...config[`${bot_id}:${group_id}`],
    }
  }

  /** other配置 */
  getOther() {
    return this.getAllCfg("other")
  }

  /**
   * @param app  功能
   * @param name 配置文件名称
   */
  getdefSet(name) {
    return this.getYaml("default_config", name)
  }

  /** 用户配置 */
  getConfig(name) {
    return this.getYaml("config", name)
  }

  getAllCfg(name) {
    return {
      ...this.getdefSet(name),
      ...this.getConfig(name),
    }
  }

  /**
   * 获取配置yaml
   * @param type 默认跑配置-defSet，用户配置-config
   * @param name 名称
   */
  getYaml(type, name) {
    const key = `${type}.${name}`
    if (key in this.config) return this.config[key]
    const file = `config/${type}/${name}.yaml`

    try {
      this.config[key] = fs.readFileSync(file, "utf8")
    } catch (err) {
      Bot.makeLog("trace", ["读取配置文件", file, "错误", err], "Config")
      return this.config[key] = undefined
    }

    this.config[key] = YAML.parse(this.config[key])
    this.watch(file, name, type)
    return this.config[key]
  }

  /** 监听配置文件 */
  watch(file, name, type = "default_config") {
    const key = `${type}.${name}`

    if (this.watcher[key]) return
    const watcher = chokidar.watch(file)
    watcher.on("change", path => {
      delete this.config[key]
      if (typeof Bot !== "object") return
      Bot.makeLog("mark", `[修改配置文件][${type}][${name}]`, "Config")
      if (`change_${name}` in this)
        this[`change_${name}`]()
    })

    this.watcher[key] = watcher
  }

  async change_bot() {
    /** 修改日志等级 */
    (await import("./log.js")).default()
  }
}

export default new Cfg()