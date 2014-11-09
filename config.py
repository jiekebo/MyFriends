import yaml


class Config(object):
    config = dict()

    def __new__(cls):
        with open("config.yaml", "r") as config:
            yaml_config = yaml.load_all(config)
            for doc in yaml_config:
                Config.read_config(doc, Config.config)

    @staticmethod
    def read_config(config, config_dict):
        if isinstance(config, list):
            for value in config:
                Config.read_config(value, config_dict)
        elif isinstance(config, dict):
            for key, value in config.items():
                if isinstance(value, list):
                    sub_config = dict()
                    config_dict[key] = sub_config
                    Config.read_config(value, sub_config)
                else:
                    config_dict[key] = value

    @staticmethod
    def get_config(system, value):
        return Config.config[system][value]
