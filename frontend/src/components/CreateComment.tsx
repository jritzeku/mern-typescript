import React, { useState } from 'react'

interface IProps {
    createCommentHandler(arg: string): void
}

const CreateComment: React.FC<IProps> = ({ createCommentHandler }) => {

    const [content, setContent] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createCommentHandler(content)
        setContent('')
    }

    return (

        <form
            onSubmit={handleSubmit}
            className='mt-8'

        >

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Write your comment here...'
                className=" text-[14px] py-2 rounded-lg appearance-none block w-full py-3 px-3 text-base  leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                rows={5}
            ></textarea>

            {/* 
            <button
                type='submit'
                // disabled
                className='bg-purple-500 rounded px-3 py-2 mt-4 text-[12px] text-white cursor-pointer hover:brightness-90 w-[120px]'
            >
                Add comment
            </button> */}

            {
                content.trim() !== '' ?
                    (<button className="mt-4 rounded-lg px-4 py-2 bg-purple-700 text-white hover:bg-purple-800 duration-300">Add comment</button>)
                    : (<button className="mt-4 rounded-lg px-4 py-2 bg-purple-700 text-white opacity-50 cursor-not-allowed disabled:cursor-not-allowed disabled:opacity-50" disabled>Add comment</button>
                    )
            }
        </form>

    )
}


export default CreateComment


/*
NOTE:

-Disabling buttons with tailwind

    ->seems we have to use latest version? 
    ->also, see the codepen example for disabled button

https://stackoverflow.com/questions/64962149/tailwindcss-disabled-variant-not-working#:~:text=had%20this%20problem%20and%20updating%20Tailwind%20CSS%20to%20the%20latest%20version%20fixed%20it.
https://codepen.io/lynnecodes/pen/jOmPjra
*/