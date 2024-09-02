import os

def write_files_to_txt(folder_path, ignore_folder, output_file):
    with open(output_file, 'w') as file:
        for root, dirs, files in os.walk(folder_path):
            # Skip the ignore folder
            if ignore_folder in root:
                continue

            # Compute the relative depth of the current directory
            relative_root = os.path.relpath(root, folder_path)
            depth = len(relative_root.split(os.sep))
            
            # Write the directory path with dashes indicating depth
            if relative_root == '.':
                file.write('-\n')
            else:
                file.write(f'{"-" * (depth - 1)} {os.path.basename(root)}/\n')
            
            # Write the files in the current directory
            for file_name in files:
                file.write(f'{"-" * depth} {file_name}\n')

# Define paths
folder_path = r"E:\ecommerce\final\ecommercefrontend"
ignore_folder = r"E:\ecommerce\final\ecommercefrontend\node_modules"
output_file = 'file_structure.txt'

# Generate the file structure
write_files_to_txt(folder_path, ignore_folder, output_file)
