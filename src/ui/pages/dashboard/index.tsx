import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 12500, profit: 4200 },
  { month: 'Fev', sales: 15800, profit: 5600 },
  { month: 'Mar', sales: 14200, profit: 4900 },
  { month: 'Abr', sales: 18900, profit: 7100 },
  { month: 'Mai', sales: 22400, profit: 8600 },
  { month: 'Jun', sales: 19800, profit: 7400 },
  { month: 'Jul', sales: 25600, profit: 10200 },
  { month: 'Ago', sales: 28100, profit: 11800 },
  { month: 'Set', sales: 24300, profit: 9500 },
  { month: 'Out', sales: 31500, profit: 13200 },
  { month: 'Nov', sales: 34700, profit: 14800 },
  { month: 'Dez', sales: 41200, profit: 17900 },
];

const productData = [
  { name: 'Jan', quantity: 320 },
  { name: 'Fev', quantity: 410 },
  { name: 'Mar', quantity: 370 },
  { name: 'Abr', quantity: 490 },
  { name: 'Mai', quantity: 580 },
  { name: 'Jun', quantity: 530 },
  { name: 'Jul', quantity: 690 },
  { name: 'Ago', quantity: 740 },
  { name: 'Set', quantity: 650 },
  { name: 'Out', quantity: 810 },
  { name: 'Nov', quantity: 920 },
  { name: 'Dez', quantity: 1080 },
];

const categoryData = [
  { name: 'Eletrônicos', value: 35, color: '#6366f1' },
  { name: 'Vestuário', value: 25, color: '#06b6d4' },
  { name: 'Casa', value: 20, color: '#10b981' },
  { name: 'Acessórios', value: 20, color: '#f59e0b' },
];

const money = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);

const compactMoney = (value: number) =>
  `R$ ${(value / 1000).toLocaleString('pt-BR', {
    maximumFractionDigits: 1,
  })} mil`;

const metrics = [
  {
    title: 'Faturamento total',
    value: 'R$ 284.500',
    change: '+12,8%',
    positive: true,
    description: 'em relação ao mês anterior',
    icon: DollarSign,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    title: 'Lucro líquido',
    value: 'R$ 96.320',
    change: '+8,4%',
    positive: true,
    description: 'em relação ao mês anterior',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Produtos vendidos',
    value: '8.642',
    change: '+15,2%',
    positive: true,
    description: 'em relação ao mês anterior',
    icon: ShoppingBag,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    title: 'Ticket médio',
    value: 'R$ 186,40',
    change: '-2,1%',
    positive: false,
    description: 'em relação ao mês anterior',
    icon: Package,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

const recentSales = [
  {
    id: '#VND-1048',
    customer: 'Ana Oliveira',
    product: 'Fone Bluetooth',
    amount: 249.9,
    status: 'Concluída',
  },
  {
    id: '#VND-1047',
    customer: 'Carlos Santos',
    product: 'Smartwatch',
    amount: 589.9,
    status: 'Pendente',
  },
  {
    id: '#VND-1046',
    customer: 'Mariana Costa',
    product: 'Teclado Mecânico',
    amount: 349.9,
    status: 'Concluída',
  },
  {
    id: '#VND-1045',
    customer: 'Pedro Almeida',
    product: 'Mouse Gamer',
    amount: 159.9,
    status: 'Cancelada',
  },
];

const tooltipStyle = {
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
};

export const DashboardHomePage = () => {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Cabeçalho */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Acompanhe o desempenho das suas vendas.
            </p>
          </div>

          <span className="w-fit rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            Visão geral · Últimos 12 meses
          </span>
        </header>

        {/* Indicadores */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const ChangeIcon = metric.positive ? ArrowUpRight : ArrowDownRight;

            return (
              <article
                key={metric.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    {metric.title}
                  </p>
                  <div className={`rounded-xl p-2.5 ${metric.bg}`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </div>

                <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                  {metric.value}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <span
                    className={`inline-flex items-center font-semibold ${
                      metric.positive ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    <ChangeIcon className="mr-0.5 h-4 w-4" />
                    {metric.change}
                  </span>
                  <span className="text-slate-400">{metric.description}</span>
                </div>
              </article>
            );
          })}
        </section>

        {/* Faturamento e lucro */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6 xl:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Faturamento e lucro
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Evolução mensal dos resultados financeiros
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#6366f1"
                        stopOpacity={0.22}
                      />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="profitGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#10b981"
                        stopOpacity={0.18}
                      />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickFormatter={(value) => `R$${value / 1000}k`}
                    width={58}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name) => [
                      money(Number(value)),
                      name === 'sales' ? 'Faturamento' : 'Lucro',
                    ]}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    height={36}
                    formatter={(value) =>
                      value === 'sales' ? 'Faturamento' : 'Lucro'
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#salesGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#profitGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Categorias */}
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Vendas por categoria
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Participação no total de vendas
            </p>

            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {categoryData.map((category) => (
                      <Cell key={category.name} fill={category.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [`${value}%`, 'Participação']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 space-y-3">
              {categoryData.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-slate-600">{category.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800">
                    {category.value}%
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Quantidade de produtos */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Produtos vendidos
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quantidade de unidades vendidas por mês
            </p>

            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productData}
                  margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      `${Number(value).toLocaleString('pt-BR')} unidades`,
                      'Vendidos',
                    ]}
                  />
                  <Bar
                    dataKey="quantity"
                    fill="#6366f1"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={34}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          {/* Resumo financeiro */}
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Resumo financeiro
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Distribuição dos resultados simulados
            </p>

            <div className="mt-8 space-y-7">
              <div>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span className="text-slate-600">Faturamento</span>
                  <span className="font-semibold text-slate-900">
                    {compactMoney(284500)}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span className="text-slate-600">Lucro líquido</span>
                  <span className="font-semibold text-slate-900">
                    {compactMoney(96320)}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: '33.86%' }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span className="text-slate-600">Custos e despesas</span>
                  <span className="font-semibold text-slate-900">
                    {compactMoney(188180)}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: '66.14%' }}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Margem de lucro simulada
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  33,86%
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Lucro líquido dividido pelo faturamento
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Últimas vendas */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Vendas recentes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Últimas transações registradas
              </p>
            </div>
            <span className="text-sm text-slate-400">Dados demonstrativos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-left text-sm">
              <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Pedido</th>
                  <th className="px-6 py-4 font-medium">Cliente</th>
                  <th className="px-6 py-4 font-medium">Produto</th>
                  <th className="px-6 py-4 font-medium">Valor</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-indigo-600">
                      {sale.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                      {sale.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {sale.product}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-800">
                      {money(sale.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          sale.status === 'Concluída'
                            ? 'bg-emerald-50 text-emerald-700'
                            : sale.status === 'Pendente'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="pb-2 text-center text-xs text-slate-400">
          Dashboard demonstrativo · Todos os valores e indicadores são
          fictícios.
        </footer>
      </div>
    </main>
  );
};
