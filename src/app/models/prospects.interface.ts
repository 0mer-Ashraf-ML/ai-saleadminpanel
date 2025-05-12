export interface prospects {
    country: string | null,
    company_name: string | null;
    company_website: string | null;
    industry: string | null;
    num_employees: number | null;
    annual_revenue: number | null;
    name: string | null;
    title: string | null;
    recommended_email: string | null;
    emails: string[];
    phones: string[];
    company_keyword: string[];
    linkedin_url: string | null;
}
