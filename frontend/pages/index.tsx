import Navbar from '../components/Navbar'
import PostList from '../components/PostList'

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto">
        <div className="md:col-span-2">
          <PostList/>
        </div>
      </div>
    </main>
  )
}
