import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const campaignData =  [
  {
    "name": "Campanha 2025",
    "description": "Promoção de inverno focada em produtos de estação."
  },
  {
    "name": "Clientes Inativos",
    "description": "Estratégia para reengajar."
  },
  {
    "name": "Campanha da Empresa",
    "description": "Ofertas e comemorações de clientes."
  }
]


const groupData = [
  {
    "name": "Leads Qualificados",
    "description": "Leads que demonstraram interesse e foram pré-qualificados."
  },
  {
    "name": "Novos Inscritos",
    "description": "Leads recém-adquiridos através do site."
  },
  {
    "name": "Clientes Recorrentes",
    "description": "Leads que já fizeram uma compra no passado."
  }
]

const leadData = [
  {
    "name": "Maria Silva",
    "email": "maria.silva@exemplo.com",
    "phone": 987654321,
    "status": "New",
    "groups": [1, 2]
  },
  {
    "name": "João Pereira",
    "email": "joao.pereira@exemplo.com",
    "phone": 912345678,
    "status": "Contacted",
    "groups": [1]
  },
  {
    "name": "Ana Souza",
    "email": "ana.souza@exemplo.com",
    "phone": 998765432,
    "status": "Converted",
    "groups": [3]
  },
  {
    "name": "Carlos Lima",
    "email": "carlos.lima@exemplo.com",
    "phone": 923456789,
    "status": "Unresponsive",
    "groups": []
  },
  {
    "name": "Fernanda Costa",
    "email": "fernanda.costa@exemplo.com",
    "phone": 934567890,
    "status": "New",
    "groups": [2]
  }
]

const campaignLeadData= [
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
        console.log("🧹🧹Limpando dados das Tabela Campaign")
        await prisma.campaign.deleteMany()
        
        campaignData.map(async (data)=>{
          await prisma.campaign.createMany({
            data: {
              name: data.name,
              description: data.description
            }
          })
        })
        console.log("👍Dados inseridos")
        console.log("🧹🧹Limpando dados das Tabela Group")
        
        await prisma.group.deleteMany()
        campaignData.map(async (data)=>{
          await prisma.group.createMany({
            data: {
              name: data.name,
              description: data.description
            }
          })
        })

        await prisma.campaignLead.deleteMany()
        await prisma.lead.deleteMany()
      } catch (error) {
        console.log(`Erro:${error}`)
      }
    }

main()