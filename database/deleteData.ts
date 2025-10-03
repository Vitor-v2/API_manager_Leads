import { prisma } from "./db";

async function deleteData () {
    console.log("🧹🧹Limpando dados das Tabela Campaign");
    await prisma.campaign.deleteMany()   
    console.log("🧹🧹Limpando dados das Tabela Lead");
    await prisma.lead.deleteMany()   
    console.log("🧹🧹Limpando dados das Tabela group");
    await prisma.group.deleteMany()   
    console.log("🧹🧹Limpando dados das Tabela campaignLead");
 await prisma.campaignLead.deleteMany()     
}

deleteData()