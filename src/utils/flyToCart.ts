
export function flyToCart(image: HTMLImageElement): void {
  const cart = document.getElementById('cart-link')

  if (!cart) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const imagePosition = image.getBoundingClientRect()
  const cartPosition = cart.getBoundingClientRect()

  const flyingImage = image.cloneNode(true) as HTMLImageElement

  flyingImage.style.position = 'fixed'
  flyingImage.style.left = `${imagePosition.left}px`
  flyingImage.style.top = `${imagePosition.top}px`
  flyingImage.style.width = `${imagePosition.width}px`
  flyingImage.style.height = `${imagePosition.height}px`
  flyingImage.style.objectFit = 'contain'
  flyingImage.style.zIndex = '9999'
  flyingImage.style.pointerEvents = 'none'
  flyingImage.style.borderRadius = '8px'

  document.body.appendChild(flyingImage)

  const moveX =
    cartPosition.left + cartPosition.width / 2 -
    (imagePosition.left + imagePosition.width / 2)

  const moveY =
    cartPosition.top + cartPosition.height / 2 -
    (imagePosition.top + imagePosition.height / 2)

  const animation = flyingImage.animate(
    [
      {
        transform: 'translate(0, 0) rotate(0deg) scale(1)',
        opacity: 1,
      },
      {
        transform: `translate(${moveX * 0.45}px, ${moveY * 0.45 - 40}px) rotate(360deg) scale(0.6)`,
        opacity: 0.9,
      },
      {
        transform: `translate(${moveX}px, ${moveY}px) rotate(720deg) scale(0.08)`,
        opacity: 0,
      },
    ],
    {
      duration: 1300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    },
  )

  animation.onfinish = () => {
    flyingImage.remove()
  }

  cart.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.12)' },
      { transform: 'scale(1)' },
    ],
    {
      duration: 450,
      easing: 'ease-out',
    },
  )
}
