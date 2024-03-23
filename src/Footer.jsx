/* eslint-disable no-unused-vars */
import React from 'react'

const Footer = () => {

  const currentYear = new Date().getFullYear();
  return (
    <footer className = "footer mt-6 has-background-success is-full-width">
      <div className = "content has-text-centered">
      <p>
        <strong>Webweavr</strong> by <a href="">Joseph Segbefia</a>.
        {/* The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
        website content is licensed
        <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >CC BY NC SA 4.0</a
        >. */}
      </p>
      <p>
      &copy; <span>{currentYear}</span> WebWeavr. All Rights Reserved.
      </p>
    </div>
  </footer>
  )
}

export default Footer
