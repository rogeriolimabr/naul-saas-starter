const ErrorPage = ({ params }: { params: { errorCode: string } }) => {
  const { errorCode } = params
  return (
    <div>
      <h1>400 - Bad Request</h1>
      <p>
        The server cannot or will not process the request due to an apparent
        client error.
      </p>
    </div>
  )
}

export default ErrorPage
