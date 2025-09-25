import { prisma } from "./database/db"


const campaign =  [
  {
    "id": 4,
    "name": "Campanha de Inverno 2025",
    "description": "Promoção de inverno focada em produtos de estação.",
    "startDate": "2025-06-21T00:00:00Z",
    "endDate": "2025-09-22T23:59:59Z"
  },
  {
    "id": 5,
    "name": "Retomada de Clientes Inativos",
    "description": "Estratégia para reengajar clientes que não interagem há mais de 6 meses.",
    "startDate": "2025-07-01T00:00:00Z",
    "endDate": null
  },
  {
    "id": 6,
    "name": "Campanha de Aniversário da Empresa",
    "description": "Ofertas e comemorações de aniversário da empresa para a base de clientes.",
    "startDate": "2025-10-05T00:00:00Z",
    "endDate": "2025-10-15T23:59:59Z"
  }
]

const group = [
  {
    "id": 1,
    "name": "Leads Qualificados",
    "description": "Leads que demonstraram interesse e foram pré-qualificados."
  },
  {
    "id": 2,
    "name": "Novos Inscritos",
    "description": "Leads recém-adquiridos através do site."
  },
  {
    "id": 3,
    "name": "Clientes Recorrentes",
    "description": "Leads que já fizeram uma compra no passado."
  }
]

const lead = [
  {
    "id": 1,
    "name": "Maria Silva",
    "email": "maria.silva@exemplo.com",
    "phone": 987654321,
    "status": "New",
    "groups": [1, 2]
  },
  {
    "id": 2,
    "name": "João Pereira",
    "email": "joao.pereira@exemplo.com",
    "phone": 912345678,
    "status": "Contacted",
    "groups": [1]
  },
  {
    "id": 3,
    "name": "Ana Souza",
    "email": "ana.souza@exemplo.com",
    "phone": 998765432,
    "status": "Converted",
    "groups": [3]
  },
  {
    "id": 4,
    "name": "Carlos Lima",
    "email": "carlos.lima@exemplo.com",
    "phone": 923456789,
    "status": "Unresponsive",
    "groups": []
  },
  {
    "id": 5,
    "name": "Fernanda Costa",
    "email": "fernanda.costa@exemplo.com",
    "phone": 934567890,
    "status": "New",
    "groups": [2]
  }
]

const campaignLead = [
  {
    "campaignId": 1,
    "leadId": 1,
    "status": "Engaged"
  },
  {
    "campaignId": 1,
    "leadId": 2,
    "status": "Contacted"
  },
  {
    "campaignId": 2,
    "leadId": 3,
    "status": "Converted"
  },
  {
    "campaignId": 2,
    "leadId": 4,
    "status": "Unresponsive"
  },
  {
    "campaignId": 3,
    "leadId": 5,
    "status": "New"
  }
]

async function main () {
    try {
        console.log("Limpando dados das Tabelas")
        await prisma.campaign.deleteMany()
        await prisma.campaignLead.deleteMany()
        await prisma.campaignLead.deleteMany()
        await prisma.campaignLead.deleteMany()
    } catch (error) {
        console.log(`Erro:${error}`)
    }
}