import { PrismaClient } from "@prisma/client";
import { schemaAddCampaignLead } from "../validation/CampaignLeadvalidation";
import { schemaCreateLead } from "../validation/validation";

const prisma = new PrismaClient();
const campaignData = [
  {
    id: 1,
    name: "Campanha 2025",
    description: "Promoção de inverno focada em produtos de estação.",
  },
  {
    id: 2,
    name: "Clientes Inativos",
    description: "Estratégia para reengajar.",
  },
  {
    id: 3,
    name: "Campanha da Empresa",
    description: "Ofertas e comemorações de clientes.",
  },
];

const groupData = [
  {
    id: 1,
    name: "Leads Qualificados",
    description: "Leads que demonstraram interesse e foram pré-qualificados.",
  },
  {
    id: 2,
    name: "Novos Inscritos",
    description: "Leads recém-adquiridos através do site.",
  },
  {
    id: 3,
    name: "Clientes Recorrentes",
    description: "Leads que já fizeram uma compra no passado.",
  },
];

const leadData = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@exemplo.com",
    phone: 987654321,
    status: "New",
  },
  {
    id: 2,
    name: "João Pereira",
    email: "joao.pereira@exemplo.com",
    phone: 912345678,
    status: "Contacted",
  },
  {
    id: 3,
    name: "Ana Souza",
    email: "ana.souza@exemplo.com",
    phone: 998765432,
    status: "Converted",
  },
  {
    id: 4,
    name: "Carlos Lima",
    email: "carlos.lima@exemplo.com",
    phone: 923456789,
    status: "Unresponsive",
  },
  {
    id: 5,
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
    for (const data of campaignData) {
      await prisma.campaign.create({
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
        },
      });
    }
    console.log("✅Dados da tabela campaignData inseridos ✅");

    for (const data of leadData) {
      const seedValidationLead = schemaCreateLead.parse(data);
      await prisma.lead.create({
        data: {
          ...seedValidationLead,
        },
      });
    }
    console.log("✅Dados da tabela leadData inseridos ✅");

    for (const data of groupData) {
      await prisma.group.create({
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
        },
      });
    }
    console.log("✅Dados da tabela group inseridos ✅");
  } catch (error) {
    console.log(error);
  }
}

async function CampaignLeads() {
  try {
    for (const data of campaignLeadData) {
      const query = schemaAddCampaignLead.parse(data);
      const result = await prisma.campaignLead.create({
        data: {
          campaignId: data.campaignId,
          leadId: query.leadId,
          status: query.status,
        },
      });
      console.log(`✅Dados da tabela campaignLead inseridos: ${result} ✅`);
    }
  } catch (error) {
    console.log(error);
  }
}

seedData();
CampaignLeads();
