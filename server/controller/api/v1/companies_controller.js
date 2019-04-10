import Repo from '../../../resources/postgre'

const handleGetSubscriber = async (req, res) => {
  const {rows} = await Repo.getListSubscriberByCompanyID(req.company.id)
  res.status(200).json(rows)
}

export {
  handleGetSubscriber
}