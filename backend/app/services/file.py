from uuid import uuid4
from shutil import copyfileobj
import os
from fastapi import UploadFile
class FileService():
  def save_file(self, file: UploadFile):
    try:
      if file.size > 2097152:
        raise ValueError("Картинка слишком большая")
      if file.content_type != ".jpg" or file.content_type != ".bmp":
        raise ValueError("Неккоректный формат картинки, используйте jpg или bmp")
      file_extension = os.path.splitext(file.filename)[1]
      unique_filename = f"{uuid4()}{file_extension}"
      file_path = f"img/{unique_filename}"
      with open(file_path, "wb") as buffer:
        copyfileobj(file.file, buffer)
      return file_path
    except ValueError as e:
      raise ValueError(str(e))