import os
import subprocess

def run_git(args):
    result = subprocess.run(["git"] + args, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"git command failed: {args}\n{result.stderr}")
    return result.stdout

def extract_tree(tree_sha, target_dir):
    print(f"Extracting tree {tree_sha} to {target_dir}")
    os.makedirs(target_dir, exist_ok=True)
    try:
        lines = run_git(["cat-file", "-p", tree_sha]).strip().split('\n')
    except Exception as e:
        print(f"Error reading tree {tree_sha}: {e}")
        return

    for line in lines:
        if not line:
            continue
        parts = line.split(maxsplit=3)
        if len(parts) < 4:
            # Maybe tab separated
            parts = line.replace('\t', ' ').split(maxsplit=3)
        if len(parts) < 4:
            # Try splitting by tab explicitly
            sub_parts = line.split('\t')
            if len(sub_parts) == 2:
                meta, name = sub_parts
                meta_parts = meta.split()
                if len(meta_parts) == 3:
                    parts = meta_parts + [name]
                else:
                    print(f"Malformed line: {line}")
                    continue
            else:
                print(f"Malformed line: {line}")
                continue

        mode, obj_type, sha, name = parts
        dest_path = os.path.join(target_dir, name)

        if obj_type == "blob":
            print(f"Writing blob {sha} -> {dest_path}")
            try:
                content = subprocess.run(["git", "cat-file", "-p", sha], capture_output=True).stdout
                with open(dest_path, "wb") as f:
                    f.write(content)
            except Exception as e:
                print(f"Error writing blob {sha} to {dest_path}: {e}")
        elif obj_type == "tree":
            extract_tree(sha, dest_path)

if __name__ == "__main__":
    # root commit tree is d0f61f24d6526159cbc5719f54fb14c91f5c8dc0
    extract_tree("d0f61f24d6526159cbc5719f54fb14c91f5c8dc0", "/workspace")
