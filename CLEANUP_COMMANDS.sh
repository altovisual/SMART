#!/bin/bash

# 🧹 Cleanup Script - SMART Pay
# Removes redundant documentation, unused code, and development scripts

echo "🧹 Starting cleanup..."

# Delete redundant documentation (13 files)
echo "📄 Removing redundant documentation..."
rm -f COMMIT_SUMMARY.md
rm -f GIT_COMMANDS.md
rm -f CHECKOUT_COMPONENTS_CODE.md
rm -f EVILCHARTS_SETUP.md
rm -f LOGIN_TROUBLESHOOTING.md
rm -f WORKAROUND_LOGIN.md
rm -f ACCOUNT_CHECK.md
rm -f DEV_MODE_CONFIG.md
rm -f DESIGN_UPDATE.md
rm -f FINAL_DESIGN_UPDATE.md
rm -f SMOOTH_TRANSITIONS.md
rm -f APPLE_BORDER_RADIUS.md
rm -f PAYMENT_SYSTEM_COMPLETE.md

# Delete unused code (5 files)
echo "💻 Removing unused code..."
rm -f src/components/charts/TremorCharts.jsx
rm -f src/pages/Dashboard/AppleUserDashboard.jsx
rm -f src/pages/Dashboard/ModernDashboard.jsx
rm -f src/styles/appleDesignSystem.js
rm -f src/styles/designSystem.js

# Delete development scripts (entire folder)
echo "🔧 Removing development scripts..."
rm -rf scripts/

# Delete this cleanup report and script
echo "📋 Removing cleanup files..."
rm -f CLEANUP_REPORT.md
rm -f CLEANUP_COMMANDS.sh

echo "✅ Cleanup complete!"
echo "📊 Summary:"
echo "  - 13 documentation files removed"
echo "  - 5 code files removed"
echo "  - 1 scripts folder removed"
echo "  - Total: 23 files cleaned"
echo ""
echo "🚀 Next steps:"
echo "  git add ."
echo "  git commit -m 'chore: cleanup unused files and redundant documentation'"
echo "  git push origin main"
