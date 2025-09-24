import {Router} from 'express'
import { controllerLead } from './controller/controller'
import { controllerGroup } from './controller/controllerGroup'
import { controllerCampaign } from './controller/campaign'
import {controllerCampaignLeads } from './controller/campaignLead'
import { controllerLeadinGroup } from './controller/controllerGroupLead'

    const leadController = new controllerLead()
    const groupController = new controllerGroup()
    const campaignController = new controllerCampaign()
    const campaignLeadsController = new controllerCampaignLeads()
    const controllerGroupLead = new controllerLeadinGroup()

    const router = Router()

router.get('/lead', leadController.index)
router.post('/lead', leadController.create)
router.get('/lead/:id', leadController.findById)
router.delete('/lead/:id', leadController.delete)
router.put('/lead/:id', leadController.update)

router.get('/group', groupController.index)
router.post('/group', groupController.create)
router.get('/group/:id', groupController.show)
router.delete('/group/:id', groupController.delete)
router.put('/group/:id', groupController.update)

router.get('/campaigns', campaignController.index)
router.post('/campaigns', campaignController.create)
router.get('/campaigns/:id', campaignController.show)
router.delete('/campaigns/:id', campaignController.delete)
router.put('/campaigns/:id', campaignController.update)

router.get("/campaigns/:campaignId/leads", campaignLeadsController.getLeads)
router.post("/campaigns/:campaignId/leads", campaignLeadsController.addLeads)
router.put("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.updateStatus)
router.delete("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.deleteLead)

router.get("/groups/:groupId/leads", controllerGroupLead.getLeadinGroup)
router.post("/groups/:groupId/leads", controllerGroupLead.addLeadinGroup)
router.delete("/groups/:groupId/leads/:leadId", controllerGroupLead.deleteLeadinGroup)


router.get('/status', (req,res,next)=>{
    try {
        res.json({message: "ok"})
    } catch (error) {
        next(error)
    }
})
export {router}