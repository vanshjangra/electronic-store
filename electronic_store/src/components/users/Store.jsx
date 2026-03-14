import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { getCategories } from '../../services/CategoryService'
import { useEffect, useState } from 'react'
import defaultCategoryImage from '../../assets/default_profile.jpg'

function Store(){
    const [categories, setCategories] = useState(null)
    const [products, setProducts] = useState(null)

    useEffect(() => {
        loadCategories(0, 100000)
    }, [])

    const loadCategories = (pageNumber, pageSize) => {
        getCategories(pageNumber, pageSize)
        .then(data => {
            console.log(data)
            setCategories({...data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    const loadProducts = () => {

    }

    const categoryView = () => {
      return categories && (
        <>
        <ListGroup variant='flush' className='stick-top'>
            <ListGroup.Item action>
                <img src={defaultCategoryImage} alt={'default category image'} className=' rounded-circle'
                     style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover"
                     }}
                     onError={event => {
                        event.currentTarget.setAttribute('src', defaultCategoryImage)
                     }}/>
                <span className='ms-2'>All Products</span>
            </ListGroup.Item>

            {categories.content.map(cat => (
            <ListGroup.Item action key={cat.categoryId}>
                <img src={cat.coverImage} alt={cat.title} className=' rounded-circle'
                     style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover"
                     }}
                     onError={event => {
                        event.currentTarget.setAttribute('src', defaultCategoryImage)
                     }}/>
                <span className='ms-2'>{cat.title}</span>
            </ListGroup.Item>
            ))}
        </ListGroup>
        </>
      )
    }

    const productsView = () => {
      return (
        <h1>This is product view</h1>
      )
    }

  return (
    <Container fluid className='px-5 pt-5'>
        <Row>
            <Col md={2}>
            {categoryView()}
            </Col>

            <Col md={10}>
            {productsView()}
            </Col>
        </Row>
    </Container>
  )
}

export default Store
