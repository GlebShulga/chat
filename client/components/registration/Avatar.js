import React from 'react'

const Avatar = ({ avatar, setSelectedAva, setSelected, selected }) => {
  const onClickAva = () => {
    setSelected(avatar.alt)
    setSelectedAva(avatar.src)
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          onClickAva(avatar)
        }}
      >
        <img
          className={selected === avatar.alt ? 'avatarImg bg-gray-500' : 'avatarImg'}
          src={avatar.src}
          width="96"
          height="96"
          alt={avatar.alt}
        />
      </button>
    </div>
  )
}

export default Avatar
