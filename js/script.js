// Сучасний (Строгий) режим
"use strict"

// Burger
const headerBurger = document.querySelector(".header__burger")
const headerMenu = document.querySelector("#header-menu")

if (headerBurger && headerMenu) {
  const setMenuOpen = (open) => {
    headerMenu.classList.toggle("is-open", open)
    headerBurger.classList.toggle("is-open", open)
    headerBurger.setAttribute("aria-expanded", open ? "true" : "false")
    headerBurger.setAttribute("aria-label", open ? "Close menu" : "Open menu")
    document.body.classList.toggle("header-menu-open", open)
  }

  headerBurger.addEventListener("click", (event) => {
    event.stopPropagation()
    setMenuOpen(!headerMenu.classList.contains("is-open"))
  })

  headerMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false))
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && headerMenu.classList.contains("is-open")) {
      setMenuOpen(false)
    }
  })

  document.addEventListener("click", (event) => {
    if (
      headerMenu.classList.contains("is-open") &&
      !event.target.closest(".header__body")
    ) {
      setMenuOpen(false)
    }
  })
}

// About
const aboutCards = document.querySelectorAll(".cards__item")
const aboutDrawer = document.querySelector("#about-bottom-drawer")
const cardsContainer = aboutDrawer?.closest(".cards")
const drawerTitle = aboutDrawer?.querySelector(".drawer__title")
const mobileCardsQuery = window.matchMedia("(width <= 768px)")

if (aboutCards.length && aboutDrawer && cardsContainer) {
  const isMobileCards = () => mobileCardsQuery.matches

  const resetDrawerPlacement = () => {
    if (aboutDrawer.parentElement !== cardsContainer) {
      cardsContainer.appendChild(aboutDrawer)
      return
    }

    if (aboutDrawer !== cardsContainer.lastElementChild) {
      cardsContainer.appendChild(aboutDrawer)
    }
  }

  const positionDrawerUnderCard = (selectedCard) => {
    if (isMobileCards()) {
      selectedCard.after(aboutDrawer)
      return
    }

    resetDrawerPlacement()
  }

  const closeDrawer = () => {
    aboutDrawer.classList.remove("is-open")
    aboutDrawer.setAttribute("aria-hidden", "true")
    resetDrawerPlacement()
  }

  const openDrawer = (selectedCard) => {
    positionDrawerUnderCard(selectedCard)

    if (drawerTitle) {
      drawerTitle.textContent =
        selectedCard.querySelector(".cards__title")?.textContent?.trim() || ""
    }

    selectedCard.classList.add("is-active")
    selectedCard.setAttribute("aria-expanded", "true")
    aboutDrawer.classList.add("is-open")
    aboutDrawer.setAttribute("aria-hidden", "false")
  }

  const toggleDrawer = (selectedCard) => {
    const shouldOpen = !selectedCard.classList.contains("is-active")

    aboutCards.forEach((card) => {
      card.classList.remove("is-active")
      card.setAttribute("aria-expanded", "false")
    })

    if (!shouldOpen) {
      closeDrawer()
      return
    }

    openDrawer(selectedCard)
  }

  aboutCards.forEach((card) => {
    card.addEventListener("click", () => toggleDrawer(card))

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        toggleDrawer(card)
      }
    })
  })

  const handleCardsLayoutChange = () => {
    const activeCard = document.querySelector(".cards__item.is-active")

    if (!activeCard || !aboutDrawer.classList.contains("is-open")) {
      resetDrawerPlacement()
      return
    }

    positionDrawerUnderCard(activeCard)
  }

  mobileCardsQuery.addEventListener("change", handleCardsLayoutChange)
  window.addEventListener("resize", handleCardsLayoutChange)
}
