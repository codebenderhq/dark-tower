# Barad-dûr
## Requiments

- Deno
    ### How to Install 
  - Shell (Mac, Linux):
  ```curl -fsSL https://deno.land/install.sh | sh```
  - PowerShell (Windows):
  ```iwr https://deno.land/install.ps1 -useb | iex```

## How To Run

cd into directory

``` deno run --allow-run index.ts server ``` to launch server

``` deno run --allow-run index.ts darktower ``` to launch dir watcher


### Notes
- Set enviroment variables of dir to watch and update
  - ```watch=dir to watch``` 
  - ```sdk= dir to update```
  - replace the above with the directories you would like to watch 
- This might not work on windows