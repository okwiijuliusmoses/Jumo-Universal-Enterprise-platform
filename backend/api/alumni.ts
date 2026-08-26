import { Router } from "express";
import { AlumniErpService } from "../../src/products/alumni-erp/domain/AlumniErpService";

export const alumniRouter = Router();

alumniRouter.get("/members", (req, res) => {
  const service = AlumniErpService.getInstance();
  res.json({ success: true, members: service.getMembers() });
});

alumniRouter.get("/chapters", (req, res) => {
  const service = AlumniErpService.getInstance();
  res.json({ success: true, chapters: service.getChapters() });
});

alumniRouter.get("/campaigns", (req, res) => {
  const service = AlumniErpService.getInstance();
  res.json({ success: true, campaigns: service.getCampaigns() });
});

alumniRouter.get("/opportunities", (req, res) => {
  const service = AlumniErpService.getInstance();
  res.json({ success: true, opportunities: service.getOpportunities() });
});

alumniRouter.get("/mentorships", (req, res) => {
  const service = AlumniErpService.getInstance();
  res.json({ success: true, mentorships: service.getMentorships() });
});
