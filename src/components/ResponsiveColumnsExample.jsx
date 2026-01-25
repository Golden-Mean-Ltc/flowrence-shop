 

const ResponsiveColumnsExample = () => {
  return (
 <div className="container">
  <div className="row">
    {/* Column 1 */}
    <div className="col-sm-6 col-md-4">
      <div className="p-3 border bg-light">
        Column 1
      </div>
    </div>
    {/* Column 2 */}
    <div className="col-sm-6 col-md-4">
      <div className="p-3 border bg-light">
        Column 2
      </div>
    </div>
    {/* Column 3 */}
    <div className="col-sm-6 col-md-4">
      <div className="p-3 border bg-light">
        Column 3
      </div>
    </div>
    {/* The 4th column will wrap to a new line on 'md' screens due to the 12-column limit */}
    <div className="col-sm-6 col-md-4">
      <div className="p-3 border bg-light">
        Column 4 (wraps on medium screens)
      </div>
    </div>
  </div>
</div>

  )
}

export default ResponsiveColumnsExample