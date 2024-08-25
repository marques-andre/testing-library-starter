import { render, screen } from '@testing-library/react'
import ProductImageGallery from '../../components/ProductImageGallery'

describe('ProductImageGallery', () => {
  it('should render an empty dom when an empty array is given', () => {
    const {container} = render(<ProductImageGallery imageUrls={[]} />)

    expect(container).toBeEmptyDOMElement();
  })
   it('should render a list of images', () => {
    const imagesArray: string[] = [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1547045662-3e1453a8c8c9",
      "https://images.unsplash.com/photo-1551892589-865f69869478",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
    ]
    
    render(<ProductImageGallery imageUrls={imagesArray} />)

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6);
    imagesArray.forEach((url: string, i: number) => {
      expect(images[i]).toHaveAttribute('src', url)
    })
  })
})