"use client";
import { getProviders, signIn } from "next-auth/react"

// eslint-disable-next-line @next/next/no-async-client-component
const Login = async () => {
  const providers = await getProviders().then((res) => {
    return res;
  });

  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <div className="mt-8 space-y-6">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.id} className="text-center">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className={`${
                  provider.id === 'google'
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-gray-900 hover:bg-gray-700'
                } text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full`}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                >
                  <title>{`${provider.name} icon`}</title>
                  <path
                    d={
                      provider.id === 'google'
                        ? 'M12 11.9895V14.9833H18.4534C17.8226 17.3436 15.9168 18.9287 12 18.9287C8.40642 18.9287 5.60391 16.2298 5.60391 12.5692C5.60391 8.90865 8.40642 6.20977 12 6.20977C13.9481 6.20977 15.3088 6.90548 16.1361 7.70123L18.8052 5.15565C17.0435 3.53389 14.8346 2.5 12 2.5C6.7528 2.5 2.5 6.58242 2.5 12C2.5 17.4176 6.7528 21.5 12 21.5C17.3276 21.5 21.5 17.8298 21.5 12.1789C21.5 11.4015 21.3937 10.6923 21.264 10.0036H12Z'
                        : 'M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z'
                    }
                  />
                </svg>
                <span>Login with {provider.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;