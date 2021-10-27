import { gql } from '@apollo/client'

// TODO create schema file
export const CreateItem = gql`
    mutation CreateItem ($image: Upload!){
        createItem(image: $image, createItemInput: CreateItemInput){
            itemId
            title
            description
            image
            createdAt
            updatedAt
            status
        }
    }
`
