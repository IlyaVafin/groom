from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from functools import lru_cache
class Settings(BaseSettings):
  database_url: str
  secret_key: SecretStr
  algorithm: str 
  access_token_expire_minutes: str
  model_config = SettingsConfigDict(env_file=".env")
@lru_cache
def get_settings():
  return Settings()