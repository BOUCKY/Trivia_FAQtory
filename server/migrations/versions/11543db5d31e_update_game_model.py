"""update game model.

Revision ID: 11543db5d31e
Revises: 8fc38a9e2d64
Create Date: 2023-12-14 10:05:20.134851

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11543db5d31e'
down_revision = '8fc38a9e2d64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('letter', sa.String(), nullable=True),
    sa.Column('round1', sa.String(), nullable=True),
    sa.Column('round2', sa.String(), nullable=True),
    sa.Column('hidden_round', sa.String(), nullable=True),
    sa.Column('player_round', sa.String(), nullable=True),
    sa.Column('round3', sa.String(), nullable=True),
    sa.Column('round4', sa.String(), nullable=True),
    sa.Column('final_wager', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('games')
    # ### end Alembic commands ###
