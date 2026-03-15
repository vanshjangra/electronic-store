import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import defaultCategoryImage from '../../assets/default_profile.jpg'
import { toast } from 'react-toastify'
import {getAllLive, getAllProducts} from '../../services/product.service'
import SingleProductCard from './SingleProductCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { STORE_PAGE_PRODUCT_SIZE } from '../../services/helper.service'
import { Link } from 'react-router-dom'
import CategoryView from './CategoryView'

function Store(){
    const [categories, setCategories] = useState(null)
    const [products, setProducts] = useState(null)

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
    }, [])

    useEffect(() => {
        if(currentPage > 0){
            loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
        }
    }, [currentPage])

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const loadProducts = (pageNumber, pageSize, sortBy, sortDir) => {
        getAllLive(pageNumber, pageSize, sortBy, sortDir)
        .then(data => {
            console.log(data)

            if(currentPage > 0){
                setProducts({
                    content: [...products.content, ...data.content],
                    lastPage: data.lastPage,
                    pageNumber: data.pageNumber,
                    pageSize: data.pageSize,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages
                })
            }
            else{
                setProducts({...data})
            }
        })
        .catch(error => {
            console.log(error)
            toast.error("Error in loading products")
        })
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
            <ListGroup.Item as={Link} to={`/store/${cat.categoryId}/${cat.title}`} action key={cat.categoryId}>
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
      return products && (
           <InfiniteScroll dataLength={products.content.length}
                           next={loadNextPage}
                           hasMore={!products.lastPage}
                           loader={<h3 className='my-5 text-center'>Loading more products...</h3>}
                           endMessage={<p className='my-4 text-center'>All Products loaded</p>}>
      <Container fluid>  
        <Row>                 
             {
                products.content.map(p => (
                    <Col key={p.productId} md={4}>
                    <SingleProductCard product={p}/>
                    </Col>
                ))
             }
        </Row>
      </Container>       
            </InfiniteScroll> 
      )
    }

  return (
    <Container fluid className='px-5 pt-5'>
        <Row>
            <Col md={2}>
            {<CategoryView/>}
            </Col>

            <Col md={10}>
            {productsView()}
            </Col>
        </Row>
    </Container>
  )
}

export default Store
