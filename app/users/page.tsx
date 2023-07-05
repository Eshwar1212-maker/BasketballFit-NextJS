import { FC } from 'react'
import EmptyState from '../components/EmptyState'

interface PageProps {
  
}
const page: FC<PageProps> = ({
  
}) => {
  return (
    <div className='hidden lg:block lg:pl-80 h-full'>
        <EmptyState />
    </div>
  )
}

export default page