// Form functionality
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearBtn")
  const calculateBtn = document.getElementById("calculateBtn")
  const originInput = document.getElementById("origin")
  const destinationInput = document.getElementById("destination")

  // Clear button functionality
  clearBtn.addEventListener("click", () => {
    originInput.value = ""
    destinationInput.value = ""
    originInput.focus()
  })

  // Calculate button functionality
  calculateBtn.addEventListener("click", () => {
    const origin = originInput.value.trim()
    const destination = destinationInput.value.trim()

    if (!origin || !destination) {
      alert("Por favor selecciona un punto de inicio y un destino")
      return
    }

    if (origin === destination) {
      alert("El punto de inicio y destino deben ser diferentes")
      return
    }

    console.log("Calculando ruta desde:", origin, "hasta:", destination)
    alert("Ruta calculada: " + origin + " → " + destination)
  })

  // Allow Enter key to calculate
  destinationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      calculateBtn.click()
    }
  })
})
