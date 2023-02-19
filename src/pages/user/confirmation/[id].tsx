import { NextPageContext } from "next";
import { useEffect, useState } from 'react'
import axios from "axios";

const Confirmation = (props: any) => {
    console.log(props.data, 'hitting data response');
    
    return (
        <div>Confirmation here</div>
    )
}

export default Confirmation;

export async function getServerSideProps(ctx: NextPageContext) {
    const { query: { id } } = ctx
    const { res: { writeHead: writeHeadRedirect }} = ctx
    const { res: { end: endResponse } } = ctx
    const {data} = await axios({
        method: "POST",
        url: `${process.env.URL}api/users/confirmation`,
        data: {
            id: id
        }
    })
    if (data.confirmed) {
        writeHeadRedirect(302, {
            Location: '/'
        })
        endResponse()
    }
    
    return {
        props: {
            data: data 
        }
    }
}