import { FC, ReactNode } from 'react'

import classNames from 'classnames'
import Image from 'next/image'

interface Props {
  children: ReactNode
  image?: boolean
  dark?: boolean
}

const FormLayout: FC<Props> = ({ children, image, dark }) => {
  return (
    <main
      className={classNames(
        'flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-screen',
        {
          'dark bg-black text-white': dark,
          'bg-white text-gray-700': !dark,
        }
      )}
    >
      {image && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm px-14 mb-10">
          <Image
            src="/static/logos/logos-strands-ideation_text-light.svg"
            alt="Strands Logo"
            className="mx-auto h-14 w-auto"
            width={100}
            height={24}
            priority
          />
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
    </main>
  )
}

export default FormLayout
