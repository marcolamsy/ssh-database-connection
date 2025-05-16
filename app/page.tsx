import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Database Connection</h1>
            <p className="text-gray-600 mt-2">Please authenticate to access secure files</p>
          </div>
          <LoginForm />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">香港壽臣山青年獅子會資料庫</p>
      </div>
    </div>
  )
}
