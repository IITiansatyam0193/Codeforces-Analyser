import React from 'react'

const Copyright = () => {
  return (
    <div className="bg-blue-300 mt-2 p-4 text-xl flex flex-col items-center">
          {/* <!-- Heading for the profiles section --> */}
          <div className="mb-4 text-2xl  font-semibold text-blue-700">
            My Profiles
          </div>

          {/* <!-- Copyright and Links Section --> */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <a
                href="https://codeforces.com/profile/goyalsatyam_0193"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition duration-300"
              >
                CodeForces
              </a>
              <a
                href="https://leetcode.com/u/goyalsatyam_0193"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition duration-300"
              >
                LeetCode
              </a>
              <a
                href="https://github.com/IITiansatyam0193"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/satyam-goyal-700358260"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition duration-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:satyamgoyal0193@gmail.com"
                className="hover:text-blue-900 transition duration-300"
              >
                Email
              </a>
              <div className="text-blue-700">
                <div className="flex-shrink-0 text-red-700">
                  &copy; Satyam Goyal
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Copyright