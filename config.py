import yaml

class Config(object):

  config = dict()
  
  def __new__(cls):
    with open("config.yaml", "r") as config:
      yaml_config = yaml.load_all(config)
      for doc in yaml_config:
        Config.readConfig(doc, Config.config)

  @staticmethod
  def readConfig(config, configDict):
    if isinstance(config, list):
      for value in config:
        Config.readConfig(value, configDict)
    elif isinstance(config, dict):
      for key, value in config.items():
        if isinstance(value, list):
          subConfig = dict()
          configDict[key] = subConfig
          Config.readConfig(value, subConfig)
        else:
          configDict[key] = value

  @staticmethod
  def getConfig(system, value):
    return Config.config[system][value]
