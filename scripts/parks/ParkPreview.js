import { useParkById } from "./ParkProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".preview--park")

eventHub.addEventListener("parkSelected", event => {
  const parkId = event.detail.parkId

  if(parkId !== "0") {
    const selectedPark = useParkById(parkId)

    render(selectedPark)
  }

  else {
    derender()
  }
})

contentTarget.addEventListener("click", event => {
  const [ targetIdPrefix, parkId ] = event.target.id.split("--")

  if(targetIdPrefix === "openParkDetail") {
    const dialogNode = document.querySelector(`#parkDialog--${parkId}`)
    dialogNode.showModal()
  }

  else if(targetIdPrefix === "closeParkDetail") {
    const dialogNode = document.querySelector(`#parkDialog--${parkId}`)
    dialogNode.close()
  }
})

eventHub.addEventListener("itineraryChange", () => {
  derender()
})

const render = park => {
  contentTarget.innerHTML = `
  <div class="previewBox">
    <h3 class="preview__header">${park.name}</h3>
    <div class="preview__location">${park.addresses[0].city}, ${park.addresses[0].stateCode}</div>
    <button class="detailButton" id="openParkDetail--${park.id}">Details</button>
    <dialog class="dialog dialog--park" id="parkDialog--${park.id}">
      <h4 class="preview-dialog__header">${park.name}</h4>
      <p class="preview-dialog__description">${park.description}</p>
      <h5 class="preview-dialog__activities-header">Activities</h5>
      <div class="list">
      <ul class="preview-dialog__activities">
        ${
          park.activities.map(activity => 
            `<li class="activity">${activity.name}</li>`
          ).join("")
        }
      </ul>
      </div>
      <button class="closeButton" id="closeParkDetail--${park.id}">Close</button>
    </dialog>
  </div>
  `
}  

const derender = () => {
  contentTarget.innerHTML = ""
}