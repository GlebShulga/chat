import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from '../Head'
import { setChosenAvatar } from '../../redux/reducers/avatars'

const Avatars = (props) => {
  const listOfAvatars = useSelector((s) => s.avatars.listOfAvatars)
  const [selected, setSelected] = useState('')
  const [selectedAva, setSelectedAva] = useState(null)

  const dispatch = useDispatch()

  const onClickSave = () => {
    if (selected) {
      dispatch(setChosenAvatar(selectedAva))
      props.setToggle(false)
    }
  }
  const onClickAva = (avatar) => {
    setSelected(avatar.alt)
    setSelectedAva(avatar.src)
  }

  return (
    <div className="opacity-100 z-0">
      <Head title="Avatar's list" />
      <div className="grid justify-items-center">
        <div className="flex flex-col pt-3">
          <div className="text-gray-200 text-5xl font-bold grid justify-center py-5">Avatars</div>
          <div className="grid gap-4 grid-cols-3">
            {listOfAvatars?.map((avatar) => {
              return (
                <button
                  key={avatar.alt}
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
              )
            })}
          </div>
          <div className="pt-4 grid justify-center">
            <button
              type="button"
              className="px-7 py-2 rounded-full bg-gray-300 text-gray-600 max-w-max shadow-sm hover:bg-gray-300"
              onClick={onClickSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Avatars)
