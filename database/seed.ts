import { PrismaClient } from "@prisma/client";
import { schemaAddCampaignLead } from "../validation/CampaignLeadvalidation";
import { schemaCreateLead } from "../validation/validation";

const prisma = new PrismaClient();
const campaignData = [
  {
    name: "Campanha 2025",
    description: "Promoção de inverno focada em produtos de estação.",
  },
  {
    name: "Clientes Inativos",
    description: "Estratégia para reengajar.",
  },
  {
    name: "Campanha da Empresa",
    description: "Ofertas e comemorações de clientes.",
  },
];

const groupData = [
  {
    name: "Leads Qualificados",
    description: "Leads que demonstraram interesse e foram pré-qualificados.",
  },
  {
    name: "Novos Inscritos",
    description: "Leads recém-adquiridos através do site.",
  },
  {
    name: "Clientes Recorrentes",
    description: "Leads que já fizeram uma compra no passado.",
  },
];

const leadData = [
  {
    name: "Maria Silva",
    email: "maria.silva@exemplo.com",
    phone: 987654321,
    status: "New",
  },
  {
    name: "João Pereira",
    email: "joao.pereira@exemplo.com",
    phone: 912345678,
    status: "Contacted",
  },
  {
    name: "Ana Souza",
    email: "ana.souza@exemplo.com",
    phone: 998765432,
    status: "Converted",
  },
  {
    name: "Carlos Lima",
    email: "carlos.lima@exemplo.com",
    phone: 923456789,
    status: "Unresponsive",
  },
  {
    name: "Fernanda Costa",
    email: "fernanda.costa@exemplo.com",
    phone: 934567890,
    status: "New",
  },
];

const campaignLeadData = [
  {
    campaignId: 1,
    leadId: 1,
    status: "Engaged",
  },
  {
    campaignId: 1,
    leadId: 2,
    status: "Contacted",
  },
  {
    campaignId: 2,
    leadId: 3,
    status: "Converted",
  },
  {
    campaignId: 2,
    leadId: 4,
    status: "Unresponsive",
  },
  {
    campaignId: 3,
    leadId: 5,
    status: "New",
  },
];

async function seedData() {
  try {
    
//     campaignData.map(async (data) => {
//       await prisma.campaign.createMany({
//         data: {
//           name: data.name,
//           description: data.description,
//         },
//       });
//   });
//   console.log("✅Dados da tabela inseridos ✅");

// groupData.map(async (data) => {
//   await prisma.group.createMany({
//     data: {
//       name: data.name,
//       description: data.description,
//     },
//   });
// });


campaignLeadData.map(async (campaignData) => {
  const validationCampaignLead = schemaAddCampaignLead.parse(campaignData);
  
  await prisma.campaignLead.createMany({
    data: {
      campaignId: +campaignData.campaignId,
      ...validationCampaignLead,
    },
  });
});

// leadData.map(async (datas) =>{
//   const seedValidationLead = schemaCreateLead.parse(datas)
//   await prisma.lead.createMany({
//     data:{
//       ...seedValidationLead
//     }
//   })
// })
} catch (error) {
 console.log(error) 
}
}

seedData()
