# Globant-Piscine-ServiceDeskAI
Globant piscine project intended to develop an application that allows reporting problems and damaged items in Glober offices or homes using geolocation, machine learning, and other technologies to make the experience as simple as possible.


# Docker knowledge

- When installing things inside the container, like an app with pnpm, probably, the TS error checking won't be correct in VS code in the host machine. To fix this, do "code container_dir_name" (eg code frontend). This will open a new VS code window. Inside that window, do ctrl + shift + p and select "Dev Containers: Attach to running container..." and select the container you want to attach to. This will make the TS error checking work correctly and we will also have access to the container terminal from the VS code terminal.