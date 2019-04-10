import Repo from '../../../resources/postgre'

const handleGetSubscriber = async (req, res) => {
  //TODO: using companyID from req auth
  const {rows} = await Repo.getListSubscriberByCompanyID(1)
  console.log(rows)
  res.status(200).json(rows)
}

export {
  handleGetSubscriber
}