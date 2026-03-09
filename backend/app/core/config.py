from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from functools import lru_cache
class Settings(BaseSettings):
  database_url: str
  secret_key: SecretStr
  algorithm: str 
  access_token_expire_minutes: str
  refresh_token_expire_days: str
  api_key: SecretStr
  admin_password: SecretStr
  admin_login: SecretStr
  model_config = SettingsConfigDict(env_file=".env")
@lru_cache
def get_settings():
  return Settings()