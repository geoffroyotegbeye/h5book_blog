

const Sidebar = ({ title, children }) => (
  <div className="bg-white shadow-lg p-4 space-y-6 rounded-xl border">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <div>{children}</div>
  </div>
);

export default Sidebar;
