import { Button } from "react-bootstrap"

const SingleProductView = ({
    index,
    product
}) => {

  const formatDate = (time) => {
    return new Date(time).toLocaleDateString()
  }

  return (
    <tr>
      <td># {index + 1}</td>
      <td>{product.title}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{product.discountedPrice}</td>
      <td>{product.live ? 'Live' : 'Not Live'}</td>
      <td>{product.stock ? 'In Stock' : 'Out Of Stock'}</td>
      <td>{product.category ? product.category.title : ''}</td>
      <td>{formatDate(product.addedDate)}</td>

      <td>
        <Button variant="danger" size="sm">Delete</Button>
        <Button className="ms-2" variant="warning" size="sm">View</Button>
        <Button className="ms-2" variant="dark" size="sm">Update</Button>
      </td>  
    </tr>
  )
}

export default SingleProductView
