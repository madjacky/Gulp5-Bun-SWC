const storageKey = 'theme-preference'

const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey)
    else
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
}

const updateImages = (theme) => {
    const logoPicture = document.querySelector('picture.taskRunner-cover')

    if (!logoPicture) {
        return
    }

    const sources = logoPicture.querySelectorAll('source')
    const isDark = theme.value === 'dark'

    sources.forEach(source => {
        const srcset = source.getAttribute('srcset')
        const isSourceDark = srcset.includes('-dark.')

        if (isSourceDark) {
            source.setAttribute('media', isDark ? '' : '(prefers-color-scheme: dark)')
        } else {
            source.setAttribute('media', isDark ? '(prefers-color-scheme: light)' : '')
        }

        if (source.getAttribute('media') === '') {
            source.removeAttribute('media')
        }
    })

    const img = logoPicture.querySelector('img')
    if (img) {
        let currentSrc = img.getAttribute('src')
        let basePath = currentSrc.replace(/-light\.||-dark\./, '-')
        let extension = currentSrc.split('.').pop()

        img.setAttribute('src', `${basePath}${isDark ? 'dark' : 'light'}.${extension}`)
    }
}

const reflectPreference = (theme) => {
    document.firstElementChild
        .setAttribute('data-theme', theme.value)

    document
        .querySelector('#theme-toggle')
        ?.setAttribute('aria-label', theme.value)

    updateImages(theme)
}

const setPreference = (theme) => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference(theme)
}

export const initializeTheme = () => {
  const theme = {
      value: getColorPreference(),
  }

  reflectPreference(theme)

  const onClick = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
      setPreference(theme)
  }

  window.onload = () => {
      reflectPreference(theme)

      document
          .querySelector('#theme-toggle')
          ?.addEventListener('click', onClick)
  }
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({matches:isDark}) => {
        theme.value = isDark ? 'dark' : 'light'
        setPreference(theme)
    })
}