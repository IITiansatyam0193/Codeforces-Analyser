import { useEffect, useState } from "react";
import "./App.css";
import TotalProblem from "./Data/TotalProblem.js";
import AllContestsData from "./Data/AllContestsData.js";
import Accuracy from "./components/Accuracy.jsx";
import TotalSubLiveContest from "./Data/TotalSubLiveContest.js";
import Plot from "./components/Plot.jsx";
import TagsVsCount from "./Data/TagsVsCount.js";
import Tags from "./utils/Tags.jsx";
import ContestVsRank, { BestRank } from "./Data/ContestVsRank.js";
import ContestRank from "./utils/ContestRank.jsx";
import LoadingComp from "./components/LoadingComp.jsx";
import Copyright from "./components/Copyright.jsx";

function App() {
  const [userName, setUserName] = useState("");
  const [selectedValue, setSelectedValue] = useState(36);
  const [loading, setLoading] = useState(false);

  const [allSubmissions, setAllSubmissions] = useState([]);
  const [allContestData, setAllContestData] = useState([]);
  const [allContestSubmission, setAllContestSubmission] = useState([]);
  const [tagVsCountContest, setTagVsCountContest] = useState([]);
  const [tagVsCountPractice, setTagVsCountPractice] = useState([]);
  const [dataTimePeriod, setDataTimePeriod] = useState([]);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const CheckUser = async () => {
      try {
        const resp = await fetch(
          `https://codeforces.com/api/user.info?handles=${userName}`
        );
        const res = await resp.json();
        // console.log("res ",res);
        if (res.status === "FAILED") {
          // console.log("user does not exists");
          seterror(true);
        } else {
          seterror(false);
        }
      } catch (error) {
        setLoading(false);
        // console.log("user does not exists");
        seterror(true);
      }
    };
    if (userName) {
      CheckUser();
    }
  }, [userName]);

  useEffect(() => {
    const fetchData = async () => {
      const submissions = await TotalProblem(userName);
      const contestData = await AllContestsData(userName);
      const liveSubmissions = TotalSubLiveContest(submissions);
      const tagVsCountContestData = TagsVsCount(liveSubmissions);
      const tagVsCountPracticeData = TagsVsCount(submissions);
      const timePeriodData = ContestVsRank(contestData, selectedValue);
      //   console.log(submissions);

      setAllSubmissions(submissions);
      setAllContestData(contestData);
      setAllContestSubmission(liveSubmissions);
      setTagVsCountContest(tagVsCountContestData);
      setTagVsCountPractice(tagVsCountPracticeData);
      setDataTimePeriod(timePeriodData);
      setLoading(false);
    };

    if (userName) {
      fetchData();
    }
  }, [userName, selectedValue]);

  return (
    <>
      <form
        className="flex justify-center m-5"
        onSubmit={(event) => {
          event.preventDefault();
          setAllSubmissions([]);
          setAllContestData([]);
          setAllContestSubmission([]);
          setTagVsCountContest([]);
          setTagVsCountPractice([]);
          setDataTimePeriod([]);
          setUserName(event.target.Username.value);
		      event.target.Username.value = "";
          setLoading(true);
        }}
      >
        <input
          type="text"
          id="Username"
          placeholder="Codeforces UserName"
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Submit
        </button>
      </form>
      { allSubmissions.length!==0  &&  allContestData.length!==0  &&  (
        <>
          <div className="flex justify-center m-3 bg-gray-600 text-white p-1 text-2xl rounded-lg w-1/2 mx-auto">
            {userName}
          </div>
          <div className="font-bold text-2xl flex justify-center bg-slate-300">
            Rating vs Submission
          </div>
          <div className="mb-10 mx-auto">
            <div className="mb-10">
              <div className="flex justify-center text-2xl bg-blue-300 p-2 rounded-lg mt-2">
                During Practice
              </div>
              <Plot allsubmission={allSubmissions} />
              <div className="bg-blue-300 my-2 mx-auto flex justify-center">
                Swipe left or right for a better view.
              </div>
            </div>
            <div>
              <div className="flex justify-center text-2xl bg-blue-300 p-2 rounded-lg mt-2">
                During Contest
              </div>
              <Plot allsubmission={allContestSubmission} />
              <div className="bg-blue-300 my-2 mx-auto flex justify-center">
                Swipe left or right for a better view.
              </div>
            </div>
          </div>
          <div className="font-bold text-2xl flex justify-center bg-slate-300">
            Accuracy
          </div>
          <div className="flex flex-col md:flex-row justify-center mt-10 px-2 ">
            <div className="flex justify-center text-lg md:text-2xl mb-1">
              <Accuracy data={allSubmissions} title="During Practice" />
            </div>
            <div className="flex justify-center text-lg md:text-2xl mb-1">
              <Accuracy data={allContestSubmission} title="During Contest" />
            </div>
          </div>

          <div className="font-bold text-2xl flex justify-center mx-auto bg-slate-300">
            Contest Best Stats
          </div>
          <div className="flex justify-center mt-9 mx-auto gap-10">
            <div className="flex justify-center text-2xl">
              <div className="flow-root bg-slate-300 mb-10">
                <dl className="p-2 my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Handle</dt>
                    <dd className="text-gray-700 sm:col-span-2">{userName}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">No of Contest</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {allContestData.length}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Best Rank</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {BestRank["rank"]}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Contest Name</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {BestRank["contest"]}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="flex justify-center text-2xl"></div>
          </div>

          <div className="font-bold text-2xl flex justify-center bg-slate-300">
            Rating Graph
          </div>
          <div className="dropdown-container flex justify-center mt-10">
            <label htmlFor="range-dropdown">Select : </label>
            <select
              id="range-dropdown"
              value={selectedValue}
              onChange={(event) => {
                setSelectedValue(event.target.value);
              }}
              className="range-dropdown border rounded"
            >
              <option value={3}>Last 3 Months</option>
              <option value={6}>Last 6 Months</option>
              <option value={12}>Last 12 Months</option>
              <option value={24}>Last 24 Months</option>
              <option value={36}>Last 36 Months</option>
              <option value={120}>Last 120 Months</option>
            </select>
          </div>
          <div className="flex justify-center mt-9 gap-20">
            <ContestRank data={dataTimePeriod} />
          </div>

          <div className="font-bold text-2xl flex justify-center bg-slate-300 mb-2">
            Problem Tags
          </div>
          <div className="flex flex-col md:flex-row justify-center mt-0 gap-1  px-2">
            <div className="flex flex-col items-center text-lg md:text-2xl">
              <div className="bg-blue-300 p-1 w-full text-center">
                During Practice
              </div>
              <Tags data={tagVsCountPractice} />
              <div className="bg-slate-300 p-2 space-y-1">
                <div>DP: {tagVsCountPractice["dp"]}</div>
                <div>Binary Search: {tagVsCountPractice["binary search"]}</div>
                <div>
                  Data Structures: {tagVsCountPractice["data structures"]}
                </div>
                <div>
                  DFS and Similar: {tagVsCountPractice["dfs and similar"]}
                </div>
                <div>Trees: {tagVsCountPractice["trees"]}</div>
              </div>
            </div>
            <div className="flex flex-col items-center text-lg md:text-2xl">
              <div className="bg-blue-300 p-1 w-full text-center">
                During Contest
              </div>
              <Tags data={tagVsCountContest} />
              <div className="bg-slate-300 mb-2 mx-auto p-2 space-y-1">
                <div>DP: {tagVsCountContest["dp"]}</div>
                <div>Binary Search: {tagVsCountContest["binary search"]}</div>
                <div>
                  Data Structures: {tagVsCountContest["data structures"]}
                </div>
                <div>
                  DFS and Similar: {tagVsCountContest["dfs and similar"]}
                </div>
                <div>Trees: {tagVsCountContest["trees"]}</div>
              </div>
            </div>
          </div>
        </>
      ) }
      { loading  &&  !error  &&  <LoadingComp /> }
      { error  &&  <div className="flex justify-center m-5 text-red-700">Invalid Username</div> }
	  <Copyright />
    </>
  );
}

export default App;
