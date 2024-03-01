import os
from shutil import copy

def merge_folders(dir1, dir2, destination):
  """
  Merges folders with the same name between two directories into a single folder.

  Args:
    dir1: Path to the first directory.
    dir2: Path to the second directory.
    destination: Path to the destination directory where merged folders will be placed.
  """
  for folder in os.listdir(dir1):
    # Check if the folder exists in both directories
    if folder+'_left' in os.listdir(dir2):
      merged_folder_path = os.path.join(destination, folder)
      # Check if destination folder exists, create it if needed
      if not os.path.exists(merged_folder_path):
        os.mkdir(merged_folder_path)
      # Merge files within the folders
      for filename in os.listdir(os.path.join(dir1, folder)):
        origin_file_path = os.path.join(dir1, folder, filename)
        dest_file_path = os.path.join(merged_folder_path, filename)
        # Move or copy files depending on your preference
        # os.rename(origin_file_path, dest_file_path)  # Move file
        copy(origin_file_path, dest_file_path)  # Copy file
      for filename in os.listdir(os.path.join(dir2, folder+'_left')):
        origin_file_path = os.path.join(dir2, folder+'_left', filename)
        dest_file_path = os.path.join(merged_folder_path, filename)
        # Move or copy files depending on your preference
        # os.rename(origin_file_path, dest_file_path)  # Move file
        copy(origin_file_path, dest_file_path)  # Copy file

# Example usage
dir1 = "dataset_1_right"
dir2 = "dataset_1_left"
destination = "dataset_1"
merge_folders(dir1, dir2, destination)

