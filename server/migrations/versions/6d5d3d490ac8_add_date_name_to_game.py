"""Add date + name to Game.

Revision ID: 6d5d3d490ac8
Revises: 11543db5d31e
Create Date: 2023-12-18 16:48:36.995433

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d5d3d490ac8'
down_revision = '11543db5d31e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('date', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.drop_column('date')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
