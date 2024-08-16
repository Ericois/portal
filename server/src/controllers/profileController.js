const supabase = require('../config/supabaseClient');

// Fetch tenant data
exports.getTenantData = async (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ message: 'user_id query parameter is required' });
  }

  try {
    const { data: userTenant, error: userTenantError } = await supabase
      .from('user_tenants')
      .select('tenant_id')
      .eq('user_id', userId)
      .single();

    if (userTenantError) throw userTenantError;

    const tenantId = userTenant.tenant_id;

    const { data: tenantData, error: tenantDataError } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();

    if (tenantDataError) throw tenantDataError;

    res.status(200).json({ tenantData });
  } catch (error) {
    console.error('Error fetching tenant data:', error);
    res.status(500).json({ error: 'Failed to fetch tenant data' });
  }
};

// Update tenant data
exports.updateTenantData = async (req, res) => {
  const tenantData = req.body;

  try {
    const { error } = await supabase
      .from('tenants')
      .update(tenantData)
      .eq('id', tenantData.id);

    if (error) throw error;

    res.status(200).json({ message: 'Tenant data updated successfully' });
  } catch (error) {
    console.error('Error updating tenant data:', error);
    res.status(500).json({ error: 'Failed to update tenant data' });
  }
};
