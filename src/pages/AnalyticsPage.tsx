import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(221, 83%, 53%)', 'hsl(262, 83%, 58%)', 'hsl(160, 84%, 39%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)'];

const AnalyticsPage = () => {
  const { projects, topicSubmissions, reviewSubmissions, users } = useStore();
  const students = users.filter(u => u.role === 'student');

  const topicStatusData = [
    { name: 'Approved', value: topicSubmissions.filter(t => t.status === 'approved').length },
    { name: 'Submitted', value: topicSubmissions.filter(t => t.status === 'submitted').length },
    { name: 'Revision', value: topicSubmissions.filter(t => t.status === 'revision').length },
    { name: 'Rejected', value: topicSubmissions.filter(t => t.status === 'rejected').length },
  ].filter(d => d.value > 0);

  const projectData = projects.filter(p => p.status === 'active').map(p => {
    const topics = topicSubmissions.filter(t => t.projectId === p.id);
    return {
      name: p.title.split(' - ')[0].substring(0, 15),
      submitted: topics.filter(t => t.status !== 'draft').length,
      approved: topics.filter(t => t.status === 'approved').length,
    };
  });

  const gradeData = reviewSubmissions.filter(r => r.grade).reduce((acc, r) => {
    const g = r.grade!;
    const existing = acc.find(a => a.name === g);
    if (existing) existing.count++;
    else acc.push({ name: g, count: 1 });
    return acc;
  }, [] as { name: string; count: number }[]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">📊 Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">Insights into project progress and performance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: students.length },
          { label: 'Topics Submitted', value: topicSubmissions.filter(t => t.status !== 'draft').length },
          { label: 'Approval Rate', value: topicSubmissions.length > 0 ? `${Math.round((topicSubmissions.filter(t => t.status === 'approved').length / topicSubmissions.length) * 100)}%` : '0%' },
          { label: 'Avg Score', value: reviewSubmissions.filter(r => r.score).length > 0 ? Math.round(reviewSubmissions.filter(r => r.score).reduce((s, r) => s + (r.score || 0), 0) / reviewSubmissions.filter(r => r.score).length) : 'N/A' },
        ].map(s => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold font-display text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="p-5">
          <h3 className="font-semibold font-display text-card-foreground mb-4">Topic Status Distribution</h3>
          {topicStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={topicStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {topicStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-sm text-muted-foreground text-center py-16">No data available</p>}
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold font-display text-card-foreground mb-4">Submissions by Project</h3>
          {projectData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="submitted" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-sm text-muted-foreground text-center py-16">No data available</p>}
        </Card>
      </div>

      {gradeData.length > 0 && (
        <Card className="p-5">
          <h3 className="font-semibold font-display text-card-foreground mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {gradeData.sort((a, b) => a.name.localeCompare(b.name)).map(g => (
              <div key={g.name} className="flex items-center gap-4">
                <span className="w-10 text-sm font-bold text-foreground">{g.name}</span>
                <div className="flex-1">
                  <Progress value={(g.count / reviewSubmissions.filter(r => r.grade).length) * 100} className="h-3" />
                </div>
                <span className="text-sm text-muted-foreground w-20 text-right">{g.count} students</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsPage;
