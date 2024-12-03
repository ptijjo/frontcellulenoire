import React from 'react'

const Userid = ({ params }: { params: { id: string } }) => {
    const id = params.id as string;
    return (
        <>
            {id}
        </>
    )
}

export default Userid
